package com.example.aretech.ui.base.adapter
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import androidx.viewbinding.ViewBinding
import com.example.aretech.ui.base.adapter.util.ViewType

class RecyclerListAdapterWithMultipleTypes<VBL:ViewBinding,VBG:ViewBinding,D : Any> @JvmOverloads constructor(
    private val onInflateLinear: (LayoutInflater, ViewGroup?, Boolean) ->VBL,
    private val onInflateGRID: (LayoutInflater, ViewGroup?, Boolean) -> VBG,
    private val onBindLinear: (VBL, D, Int) -> Unit,
    private val onBindGrid: (VBG, D, Int) -> Unit,
    private val recyclingEnabled: Boolean = true,
    diffCallback: DiffUtil.ItemCallback<D> = GenericDiffCallback()
) : ListAdapter<D, RecyclerView.ViewHolder>(diffCallback) {

    private var viewType = ViewType.GRID
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return when(viewType){
            ViewType.LINEAR.ordinal ->{
                RecyclerViewHolder.create(parent, onInflateLinear, onBindLinear).apply {
                    setIsRecyclable(recyclingEnabled)
                }
            }
            else -> {
                RecyclerViewHolder.create(parent, onInflateGRID, onBindGrid).apply {
                    setIsRecyclable(recyclingEnabled)
                }
            }

        }
    }

    override fun getItemId(position: Int): Long {
        return position.toLong()
    }

    override fun getItemViewType(position: Int): Int {
        return viewType.ordinal
    }

    fun setViewType(viewType: ViewType){
         this.viewType = viewType
         notifyDataSetChanged()
     }
    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        val item = getItem(position)
        when(holder.itemViewType){
            ViewType.LINEAR.ordinal ->{
                item?.let { (holder as RecyclerViewHolder<VBL, D>).bind(it) }
            }
            else -> {
                item?.let { (holder as RecyclerViewHolder<VBG, D>).bind(it) }

            }
        }
    }
}