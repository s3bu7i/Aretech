package com.example.aretech.ui.base.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import androidx.viewbinding.ViewBinding

open class RecyclerViewHolder<VB : ViewBinding, D>(
    private val binding: VB,
    private val onBind: (VB, D, Int) -> Unit
) : RecyclerView.ViewHolder(binding.root) {

    fun bind(data: D) {
        onBind(binding, data, absoluteAdapterPosition)
    }

    companion object {
        fun <VB : ViewBinding, D> create(
            viewGroup: ViewGroup,
            onInflate: (LayoutInflater, ViewGroup?, Boolean) -> VB,
            onBind: (VB, D, Int) -> Unit
        ): RecyclerViewHolder<VB, D> {
            return RecyclerViewHolder(
                onInflate(
                    LayoutInflater.from(viewGroup.context),
                    viewGroup,
                    false
                ),
                onBind
            )
        }
    }
}