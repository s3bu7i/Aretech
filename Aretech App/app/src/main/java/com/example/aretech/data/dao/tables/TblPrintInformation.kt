package com.example.aretech.data.dao.tables

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "print_information")
data class TblPrintInformation (
    @PrimaryKey(autoGenerate = true)
    val id:Int = 0,
    val printData:String = "",
    val printDpi:Int,
    val printMaxCharacterinTheLine:Int,
    val printerWidthSize:Float,
    val desc:String,
    val docType:String
)