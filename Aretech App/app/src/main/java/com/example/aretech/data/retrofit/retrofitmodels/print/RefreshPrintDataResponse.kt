package com.example.aretech.data.retrofit.retrofitmodels.print

import com.example.aretech.data.dao.tables.TblPrintInformation
import com.google.gson.annotations.SerializedName

data class RefreshPrintDataResponse(

	@field:SerializedName("print_dpi")
	val printDpi: Int? = null,

	@field:SerializedName("print_width")
	val printWidth: Int? = null,

	@field:SerializedName("print_text")
	val printText: String? = null,

	@field:SerializedName("max_char")
	val maxChar: Int? = null,

	@field:SerializedName("doc_type")
	val docType: String? = null,

	@field:SerializedName("desc_")
	val desc: String? = null
)

fun RefreshPrintDataResponse.toTblPrintInformation(): TblPrintInformation{
	return TblPrintInformation(
		printData = printText ?: "",
		desc = desc ?: "",
		printDpi = printDpi ?: 400,
		printerWidthSize = printWidth?.toFloat() ?: 48f,
		printMaxCharacterinTheLine = maxChar ?: 48,
		docType = docType ?: ""
	)
}