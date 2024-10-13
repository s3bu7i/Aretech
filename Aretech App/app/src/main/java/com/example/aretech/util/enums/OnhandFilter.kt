package com.example.aretech.util.enums

data class OnhandFilter (
    var onhandHigher: Boolean = false,
    var onhandLess: Boolean = false,
    var onhandEqual: Boolean = false,
)
enum class OnhandFilterValue{
    ONHAND_HIGHER,
    ONHAND_LESS,
    ONHAND_EQUAL
}