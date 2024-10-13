package com.example.aretech.ui.base

sealed class UIEvent(val message: String? = null,val code : Int?) {
    class Empty(message: String?) : UIEvent(message,0,)
    class Error(message: String?, code: Int) : UIEvent(message,code)
    class Exception(exception: String) : UIEvent(message = exception,null)
    class Unauthorized(message: String?) : UIEvent(message = message,null)
    class InternetConnectivityState(message: String) : UIEvent(message,null)
}
