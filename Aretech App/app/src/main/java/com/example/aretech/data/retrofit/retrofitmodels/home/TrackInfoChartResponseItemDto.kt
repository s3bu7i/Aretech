package com.example.aretech.data.retrofit.retrofitmodels.home

import com.google.gson.annotations.SerializedName

data class TrackInfoChartResponseItemDto(

    @field:SerializedName("id")
    val id: Int? = null,

    @field:SerializedName("travel_time")
    val travelTime: Double? = null,

    @field:SerializedName("travel_distance")
    val travelDistance: Double? = null,

    @field:SerializedName("wait_minut")
    val waitMinut: Int? = null,

    @field:SerializedName("client_name")
    val clientName: String? = null,

    @field:SerializedName("rut_status")
    val rutStatus: Boolean? = null
)