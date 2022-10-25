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
}

void loop() {
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 3000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();
    timeClient.update();
    valve_1("valve_1");
    valve_1("valve_2");
    valve_1("valve_3");
    valve_1("valve_4");
    Serial.println(" ########");
  }
}



void valve_1(String id) {
  if (checkStatus("/" + id + "/status")) {
    Serial.println(id + " status: เปิด");
  } else if (checkStatus("/" + id + "/status_1")) {
    bool s = checkTime("/" + id + "/start_1");
    Serial.println(id + "/start_1" + s);
  } else if (checkStatus("/" + id + "/status_2")) {
    bool s = checkTime("/" + id + "/start_2");
    Serial.println(id + "/start_2" + s);
  } else  if (checkStatus("/" + id + "/status_3")) {
    bool s = checkTime("/" + id + "/start_3");
    Serial.println(id + "/start_3" + s);
  } else  if (checkStatus("/" + id + "/status_4")) {
    bool s = checkTime("/" + id + "/start_4");
    Serial.println(id + "/start_4" + s);
  }
  Serial.println(" ");
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

bool checkTime(String id) {
  int H_Now = timeClient.getHours();
  int M_Now = timeClient.getMinutes();
  int H_Start = getStatus(id).substring(0, 2).toInt();
  int M_Start = getStatus(id).substring(3, 5).toInt();
  int H_End = getStatus(id).substring(0, 2).toInt();
  int M_End = getStatus(id).substring(3, 5).toInt();

  if (H_Now > H_Start) {
    if (H_Now < H_End) {
      return true;
    } else if (M_Now <= M_End) {
      return true;
    }
  } else if (H_Now == H_Start) {
    if (M_Now >= M_Start) {
      if (H_Now < M_End) {
        return true;
      } else if (M_Now <= M_End) {
        return true;
      }
    }
  }
}
