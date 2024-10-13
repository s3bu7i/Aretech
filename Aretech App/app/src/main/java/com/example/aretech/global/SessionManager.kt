package com.example.aretech.global

import android.content.Context
import android.content.SharedPreferences
import com.example.aretech.R
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject

class SessionManager @Inject constructor(@ApplicationContext appContext: Context) {
    private var prefs: SharedPreferences =
        appContext.getSharedPreferences(
            appContext.getString(R.string.app_name),
            Context.MODE_PRIVATE
        )

    companion object {
        const val USER_TOKEN = "user_token"
        const val BASE_IP = "base_ip"
        const val BASE_PORT = "base_port"
        const val USER_NAME = "username"
        const val IS_REFRESHED = "isRefreshed"
        const val LOCATION_SERVICE_IS_STOPPED_BY_ALARM = "location_service_stopped"
        const val CONNECTED_PRINTER_NAME = "printer_name"
        const val VISITED_CLIENT_CODE = "VISITED_CLIENT_CODE"
    }

    fun saveAuthToken(token: String) {
        val editor = prefs.edit()
        editor.putString(USER_TOKEN, token)
        editor.apply()
    }
    fun savePrinter(printerName: String) {
        val editor = prefs.edit()
        editor.putString(CONNECTED_PRINTER_NAME, printerName)
        editor.apply()
    }
    fun saveRefreshed(isRefresh: Boolean) {
        val editor = prefs.edit()
        editor.putBoolean(IS_REFRESHED, isRefresh)
        editor.apply()
    }

    fun saveBaseUrl(ip: String, port: String) {
        val editor = prefs.edit()
        editor.putString(BASE_IP, ip)
        editor.putString(BASE_PORT, port)
        editor.apply()
    }

    fun fetchAuthToken(): String? {
        return prefs.getString(USER_TOKEN, null)
    }

    fun fetchRefreshed() = prefs.getBoolean(IS_REFRESHED,false)

    fun fetchBaseIP(): String? {
        return prefs.getString(BASE_IP, "http://")
    }

    fun fetchBasePORT(): String? {
        return prefs.getString(BASE_PORT, "")
    }

    fun fetchBaseURL(): String? {
        return fetchBaseIP() + ":" + fetchBasePORT()
    }

    fun removeToken() {
        val editor = prefs.edit()
        editor.putString(USER_TOKEN, "")
        editor.apply()
    }

    fun saveUsername(username : String){
        val editor = prefs.edit()
        editor.putString(USER_NAME,username)
        editor.apply()
    }

    fun fetchUsername():String? {
        return prefs.getString(USER_NAME,"")
    }
    fun getPrinterName():String? {
        return prefs.getString(CONNECTED_PRINTER_NAME,"")
    }

    fun saveIsServiceStopByAlarm(isStopped:Boolean){
        val editor = prefs.edit()
        editor.putBoolean(LOCATION_SERVICE_IS_STOPPED_BY_ALARM,isStopped)
        editor.apply()
    }

    fun getIsServiceStopByAlarm():Boolean {
        return prefs.getBoolean(LOCATION_SERVICE_IS_STOPPED_BY_ALARM,false)
    }
    fun saveVisitedClientCode(code : String){
        val editor = prefs.edit()
        editor.putString(VISITED_CLIENT_CODE,code)
        editor.apply()
    }
    fun getVisitedClientCode():String? {
        return prefs.getString(VISITED_CLIENT_CODE,"")
    }
}