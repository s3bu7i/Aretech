package com.example.aretech.ui.custom_ui_componenets.model.enums

sealed class FindBarcodeInformation<T>(val data:T?,val isByDevice:Boolean) {
   class FindedItem<T>(data:T,isByDevice: Boolean):FindBarcodeInformation<T>(data,isByDevice = isByDevice)
   class OnhandSmallThanZero<T>(isByDevice: Boolean):FindBarcodeInformation<T>(null,isByDevice = isByDevice)
   class NotInPortifel<T>(isByDevice: Boolean):FindBarcodeInformation<T>(null,isByDevice = isByDevice)
   class NotInItems<T>(isByDevice: Boolean):FindBarcodeInformation<T>(null,isByDevice = isByDevice)
}