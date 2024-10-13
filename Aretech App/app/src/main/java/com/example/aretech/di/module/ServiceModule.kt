package com.example.aretech.di.module

import android.app.Service
import android.content.Context
import android.os.BatteryManager
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.components.ServiceComponent
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.android.scopes.ServiceScoped


@Module
@InstallIn(ServiceComponent::class)
object ServiceModule {

    @ServiceScoped
    @Provides
    fun provideBatteryManager(@ApplicationContext context: Context): BatteryManager {
        return context.getSystemService(Service.BATTERY_SERVICE) as BatteryManager
    }
}