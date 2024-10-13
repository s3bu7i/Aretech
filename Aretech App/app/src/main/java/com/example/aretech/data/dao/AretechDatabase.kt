package com.example.aretech.data.dao

import androidx.room.Database
import androidx.room.RoomDatabase
import com.example.aretech.data.dao.tables.TblErrors
import com.example.aretech.data.dao.tables.TblPrintInformation
import com.example.aretech.di.dao.TblDataUser

@Database(
    entities = [TblDataUser::class, TblErrors::class,TblPrintInformation::class],
    version = 1
)

abstract class AretechDatabase : RoomDatabase() {
}