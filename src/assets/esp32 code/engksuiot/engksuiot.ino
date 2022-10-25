#include <Arduino.h>
#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>
#include <NTPClient.h>

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "Weenarat-3bb"
#define WIFI_PASSWORD "Ws0828427972"

// Insert Firebase project API Key
#define API_KEY "AIzaSyBmR43bEmRoWn7aBG-WGZlrDW0B6rPJghY"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://engksuiot-default-rtdb.asia-southeast1.firebasedatabase.app/"

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
int count = 0;
bool signupOK = false;

//UTC +7 = 25200
const long utcOffsetInSeconds = 25200;

// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);


int valve_1 = 1;
int valve_2 = 2;
int valve_3 = 3;
int valve_4 = 4;

void setup() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("ok");
    signupOK = true;
  }
  else {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  timeClient.begin();

  pinMode(valve_1, OUTPUT);
  pinMode(valve_2, OUTPUT);
  pinMode(valve_3, OUTPUT);
  pinMode(valve_4, OUTPUT);
  digitalWrite(valve_1, LOW);
  digitalWrite(valve_2, LOW);
  digitalWrite(valve_3, LOW);
  digitalWrite(valve_4, LOW);

}

void loop() {
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 1000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();
    timeClient.update();
    set_valve(valve_1,"valve_1");
    set_valve(valve_2,"valve_2");
    set_valve(valve_3,"valve_3");
    set_valve(valve_4,"valve_4");
  }
}



void set_valve(int pin , String id) {
  if (checkStatus("/valve/" + id + "/status")) {
     digitalWrite(pin, LOW);
  } else if (checkStatus("/valve/" + id + "/status_1")) {
    digitalWrite(pin, checkTime("/valve/" + id + "/start_1", "/" + id + "/end_1"));
  } else if (checkStatus("/valve/" + id + "/status_2")) {
    digitalWrite(pin, checkTime("/valve/" + id + "/start_2", "/" + id + "/end_2"));
  } else  if (checkStatus("/valve/" + id + "/status_3")) {
    digitalWrite(pin, checkTime("/valve/" + id + "/start_3", "/" + id + "/end_3"));
  } else  if (checkStatus("/valve/" + id + "/status_4")) {
    digitalWrite(pin, checkTime("/valve/" + id + "/start_4", "/" + id + "/end_4"));
  } else {
    digitalWrite(pin, LOW);
  }
}

bool checkStatus(String id) {
  if (Firebase.RTDB.getBool(&fbdo, id)) {
    return fbdo.boolData();
  }
}
String getStatus(String id) {
  if (Firebase.RTDB.getString(&fbdo, id)) {
    return fbdo.stringData();
  }
}

bool checkTime(String s , String e) {
  int H_Now = timeClient.getHours();
  int M_Now = timeClient.getMinutes();
  int H_Start = getStatus(s).substring(0, 2).toInt();
  int M_Start = getStatus(s).substring(3, 5).toInt();
  int H_End = getStatus(e).substring(0, 2).toInt();
  int M_End = getStatus(e).substring(3, 5).toInt();

  if (H_Now > H_Start) {
    if (H_Now < H_End) {
      Serial.println("##### 1");
      return true;
    } else if (M_Now <= M_End) {
      Serial.println("##### 2");
      return true;
    } else {
      Serial.println("##### 3");
      return false;
    }
  } else if (H_Now == H_Start) {
    if (M_Now >= M_Start) {
      if (H_Now < M_End) {
        return true;
      } else if (M_Now <= M_End) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
}
