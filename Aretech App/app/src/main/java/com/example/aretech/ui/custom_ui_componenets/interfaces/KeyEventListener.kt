package com.example.aretech.ui.custom_ui_componenets.interfaces

import android.view.KeyEvent

interface KeyEventListener{
    fun onKeyEvent(keyCode:Int?,event: KeyEvent?):Boolean
}