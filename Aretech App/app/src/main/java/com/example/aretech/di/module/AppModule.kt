package com.example.aretech.di.module

import android.app.Application
import android.content.Context
import android.content.SharedPreferences
import android.location.LocationManager
import androidx.room.Room
import com.example.aretech.data.dao.AretechDatabase
import com.example.aretech.data.retrofit.RetrofitServiceInstance
import com.example.aretech.global.SessionManager
import com.example.aretech.global.constants.Constants.Constants.BASE_URL
import com.example.aretech.R
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.gson.Gson
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit
import javax.inject.Singleton


@Module
@InstallIn(SingletonComponent::class)
class AppModule {
    private val BASE_IP = "base_ip"
    private val BASE_PORT = "base_port"

    @Provides
    @Singleton
    fun getAppDB(@ApplicationContext context:Context): AretechDatabase {
        return Room.databaseBuilder(
            context,
            AretechDatabase::class.java,
            "Aretech_Database"
        ).
        build()
    }

    @Provides
    @Singleton
    fun provideSessionManager(
        @ApplicationContext context: Context
    ): SessionManager {
        return SessionManager(context)
    }


    @Provides
    fun getRetrofitInstanceService(retrofit: Retrofit): RetrofitServiceInstance {
        return retrofit.create(RetrofitServiceInstance::class.java)
    }

    @Provides
    @Singleton
    fun provideGson(): Gson {
        return Gson()
    }

    @Provides
    fun getRetrofitInstance(context: Application): Retrofit {
        val prefs: SharedPreferences =
            context.getSharedPreferences(
                context.getString(R.string.app_name),
                Context.MODE_PRIVATE
            )
        val ip = prefs.getString(BASE_IP, "http://19")
        val port = prefs.getString(BASE_PORT, "")
        val okHttpClient = OkHttpClient.Builder()
            .readTimeout(60, TimeUnit.SECONDS)
            .connectTimeout(60, TimeUnit.SECONDS)
            .build()
        return Retrofit.Builder().baseUrl(BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create()).build()
    }

    @Singleton
    @Provides
    fun provideLocationManager(@ApplicationContext context: Context):LocationManager{
        return context.getSystemService(Context.LOCATION_SERVICE) as LocationManager
    }

    @Singleton
    @Provides
    fun provideFusedLocationProviderClient(@ApplicationContext context: Context):FusedLocationProviderClient{
        return LocationServices.getFusedLocationProviderClient(context)
    }
}