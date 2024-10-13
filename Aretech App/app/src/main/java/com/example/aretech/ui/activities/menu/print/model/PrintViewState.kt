package com.example.aretech.ui.activities.menu.print.model


data class PrintViewState (
    val printData:String = "",
    val desc:String = "",
    val fischeSize:Int = 32,
    val listOfSize:List<PrintDescAndSize> = emptyList(),
    val isLoading:Boolean = false,
    val isPrinting:PrintingState = PrintingState.NONE,
    val isPrintConnected:PrintingState = PrintingState.NONE,
    )