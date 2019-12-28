export const formData = (arr)=>{
	let formData = new FormData()
	arr.forEach((item,index)=>{
		formData.append(item.key,item.value)
	})
	return formData
}