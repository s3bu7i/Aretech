package com.example.aretech.util

sealed class Resources <T> (val data:T? = null, val message:String? = null) {
     class Success<T>(data: T): Resources<T> (data)
     class Error<T>(data: T?=null,message: String): Resources<T> (data,message)
     class Loading<T>(var isLoading: Boolean = true) : Resources<T>(null)
     
}