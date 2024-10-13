package com.example.aretech.util.enums

enum class EnumSpecialCode(var number : Int) {
    SPECIAL_CODE(1),
    SPECIAL_CODE_2(2),
    SPECIAL_CODE_3(3),
    SPECIAL_CODE_4(4),
    SPECIAL_CODE_5(5);

    fun setEnumSpecialCode(number: Int){
        this.number = number
    }

    fun getEnumSpecialCode():Int {
        return number
    }
}