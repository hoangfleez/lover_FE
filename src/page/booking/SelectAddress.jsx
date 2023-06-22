import React from "react";

const SelectAddress = ({label, options, value, setValue, type}) => {

    const handleSubmit = (e) =>{

    }

    return(
        <div>
            <label htmlFor="select-address">{label}</label>
            <select value={value} onChange={(e) => setValue(e.target.value)} id="select-address" className="flex flex-col gap-2">
                <option value="">{`--Chọn ${label}--`}</option>
                {options && options.map(item => {
                    return (
                        <option
                            key={type === 'province' ? item.province_id : item?.district_id}
                            value={type === 'province' ? item?.province_id : item?.district_id}
                        >
                            {type === 'province' ? item?.province_name : item?.district_name}
                        </option>
                    )
                })}
            </select>
        </div>
    )

}

export default React.memo(SelectAddress);