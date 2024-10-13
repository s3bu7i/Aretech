package com.example.aretech.ui.fragments.bottom.report.report_views

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.aretech.R
import com.example.aretech.ui.fragments.bottom.report.model.ReportColumnNameAndChecked

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ColumnsNamesForFiltering(
    columns: List<ReportColumnNameAndChecked?>,
    showingColumnNames: Boolean,
    isChecked:Boolean,
    addToSelected:(String)->Unit
) {
    if (showingColumnNames) {
        FlowRow(
            modifier = Modifier
                .fillMaxWidth()
        ) {
            columns.forEach {
                Card(
                    shape = RoundedCornerShape(40.dp),
                    modifier = Modifier
                        .height(IntrinsicSize.Min)
                        .wrapContentWidth()
                        .padding(top = 5.dp, end = 10.dp)
                        .clickable {
                           addToSelected(it?.columnName ?: "")
                        },
                    colors = CardDefaults.cardColors(
                        containerColor = colorResource(
                            id = if (it?.isChecked == true) R.color.primary_50_50 else R.color.white
                        )
                    ),
                    border = BorderStroke(1.dp, color = colorResource(id = R.color.grey_scale_50)),
                    elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
                ) {
                    Text(
                        modifier = Modifier
                            .widthIn(min = 60.dp)
                            .padding(10.dp),
                        text = it?.columnName?.removePrefix("$").toString(),
                        color = if (it?.isChecked == true) colorResource(id = R.color.primary_500)
                        else colorResource(id = R.color.grey_scale_300),
                        fontFamily = FontFamily(
                            Font(
                                R.font.sf_pro_medium,
                                FontWeight.Medium
                            )
                        ),
                        fontSize = 14.sp,
                        textAlign = TextAlign.Center
                    )
                }
            }
        }
    }


}

