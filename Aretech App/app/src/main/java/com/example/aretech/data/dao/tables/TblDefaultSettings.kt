package com.example.aretech.data.dao.tables

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "tbl_default_settings")
data class TblDefaultSettings (
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val doctype: String? = null,
    val detailType: String? = null,
    val default1: String? = null,
    val default2: String? = null,
    val slsCode: String? = null,
    @ColumnInfo(name = "type", defaultValue = "")
    val type:String?= null
)