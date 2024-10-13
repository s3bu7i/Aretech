package com.example.aretech.data.dao.tables

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "tbl_errors")
data class TblErrors (
    @PrimaryKey(autoGenerate = true)
    var id:Int = 0,
    var doc_type:String,
    var ficheNo:String,
    var message:String,
    var errorType:Int, // 0 success,1 internet xetasi,2 risk,3 onhand
    var date:String
    )