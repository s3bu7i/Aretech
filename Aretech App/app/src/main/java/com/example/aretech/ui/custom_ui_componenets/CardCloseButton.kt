package com.example.aretech.ui.custom_ui_componenets

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import com.example.aretech.R


@Composable
fun CardCloseButton (
    onClick :() -> Unit
){
   Card(
       modifier = Modifier
           .size(36.dp)
           .border(
               shape = RoundedCornerShape(10.dp),
               border = BorderStroke(
                   width = 1.dp,
                   color = colorResource(id = R.color.grey_scale_50)
               )
           ),
       colors = CardDefaults.cardColors(
           containerColor = Color.Transparent
       )
   ) {
       Box(modifier = Modifier.fillMaxSize().clickable {
           onClick()
       },
       contentAlignment = Alignment.Center) {
           Icon(
               painter = painterResource(id = R.drawable.ic_close),
               tint = colorResource(id = R.color.grey_scale_900),
               contentDescription = "",
               modifier = Modifier.size(24.dp)
           )
       }

   }
}