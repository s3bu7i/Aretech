package com.example.aretech.util

import java.text.SimpleDateFormat
import java.util.*
import javax.inject.Inject
import kotlin.math.abs

class DateStringFormat @Inject constructor() {

    fun getDateNow(): String {
        val pattern = "yyyy-MM-dd"
        val simpleDateFormat = SimpleDateFormat(pattern)
        return simpleDateFormat.format(Date())
    }

    fun getDateTimeNow(): String {
        val pattern = "yyyy-MM-dd HH:mm:ss.SSS"
        val simpleDateFormat = SimpleDateFormat(pattern)
        return simpleDateFormat.format(Date())
    }
    fun getDateTimeNowMinute(): String {
        val pattern = "yyyy-MM-dd HH:mm"
        val simpleDateFormat = SimpleDateFormat(pattern)
        return simpleDateFormat.format(Date())
    }
    fun getDateTimeNowDay(): String {
        val pattern = "yyyy-MM-dd"
        val simpleDateFormat = SimpleDateFormat(pattern)
        return simpleDateFormat.format(Date())
    }
    fun getDateDiffMinute(date1:String,date2:String):Long{
        val pattern = "yyyy-MM-dd HH:mm"
        val simpleDateFormat = SimpleDateFormat(pattern)
        val diffMinute=simpleDateFormat.parse(date2).time-simpleDateFormat.parse(date1).time
        return  abs(diffMinute / 60000)
    }
    fun getDateDiffMinuteFromHours(date1:String,date2:String):Long{
        val pattern = "HH:mm:ss"
        val simpleDateFormat = SimpleDateFormat(pattern)
        val diffMinute=simpleDateFormat.parse(date2).time-simpleDateFormat.parse(date1).time
        return  abs(diffMinute / 60000)
    }

    fun getDateDiffDay(date1: String, date2: String): Long {
        val pattern = "yyyy-MM-dd"
        val simpleDateFormat = SimpleDateFormat(pattern)
        return simpleDateFormat.parse(date2).time - simpleDateFormat.parse(date1).time
    }
}