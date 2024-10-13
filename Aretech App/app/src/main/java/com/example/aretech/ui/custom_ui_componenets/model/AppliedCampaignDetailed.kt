package com.example.aretech.ui.custom_ui_componenets.model

data class AppliedCampaignDetailed (
    var cmpId:Int,
    var desc: String = "",
    var campaignCode:String = "",
    var campaignSpecode:String = "",
    var totalDisCount:Double = 0.0,
    var isCancelled:Boolean = false,
    var isCancelledPermitted:Boolean = false,
    var promotionSum:Double = 0.0,
    var isSaved:Boolean
)