package com.example.aretech.data.retrofit.retrofitmodels

data class ModelError(
    val code: String?,
    val message: String?,
    val message_error:String?
)

/*
* Error code description
* 000 username or password incorrect
* 001 localization error
* 002 internet error
* 003 server error
* 004 server syntax error
* 004 url error
* 005 localdb error
* 006 ip error
* */