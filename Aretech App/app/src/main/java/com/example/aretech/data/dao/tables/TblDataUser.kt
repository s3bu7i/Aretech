package com.example.aretech.di.dao

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "tbl_user")
data class TblDataUser(
    @PrimaryKey(autoGenerate = true)
    val id: Int,
    val username:String
)
