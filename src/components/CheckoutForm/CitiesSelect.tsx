import {createRef, FC, RefObject, useState} from "react";
import {ICities, ICitiesSelectProps, ILoadOptionsFunc, IResponseData} from "./_types";

import Select from "react-select/base";
import AsyncSelect from "react-select/async";
import {Controller} from "react-hook-form";

import Form from "react-bootstrap/Form";

const CitiesSelect: FC<ICitiesSelectProps> = ({control, error}) => {

    const [citiesArr, setCitiesArr] = useState<ICities[]>([]);
    const inputRef = createRef() as RefObject<Select>;

    const selectStyles = {
        control: (base: object, state: { isFocused: boolean; }) => ({
            ...base,
            borderRadius: '0.375rem',
            borderColor: error ? state.isFocused ? '#dc3545' : '#dc3545' : state.isFocused ? '#80bdff' : '#ced4da',
            boxShadow: state.isFocused ? error ? '0 0 0 0.25rem rgba(220,53,69,.25)' : '0 0 0 0.25rem rgba(13, 110, 253, 0.25)' : 'none',
            '&:hover': {},
        })
    }

    const loadOptions:ILoadOptionsFunc = async (inputValue, callback) => {
        try {
            const where = encodeURIComponent(JSON.stringify({
                "name": {
                    "$regex": inputValue[0]?.toUpperCase() + inputValue?.slice(1),
                }
            }));
            const response = await fetch(
                `https://parseapi.back4app.com/classes/Ukraine_City?limit=6&order=name&keys=name&where=${where}`,
                {
                    headers: {
                        'X-Parse-Application-Id': '9YBHm9Sgf1WylMCHD0pkiRn6ONZ8DnE7T8SaLINS',
                        'X-Parse-REST-API-Key': '96l6lHybz7jgbDwYSqXXuOtSC62AeP86YeT75B55',
                    }
                }
            );
            const data: IResponseData = await response.json();
            const result = (data.results.map(el => {
                return {
                    value: el.name,
                    label: el.name
                }
            }));
            setCitiesArr(result);
            callback(result);
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <Controller
            control={control}
            name={'city'}
            rules={{
                required: "City is required",
                validate: (value) => {
                    return citiesArr.some(el => el.value === value)
                }
            }}
            render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <>
                    <AsyncSelect
                        styles={selectStyles}
                        ref={inputRef}
                        cacheOptions
                        placeholder={'Select city'}
                        loadOptions={loadOptions}
                        noOptionsMessage={() => 'Start typing...'}
                        value={citiesArr.find(el => el.value === value)}
                        onChange={(newValue: any) => onChange(newValue.value)}
                        onBlur={onBlur}
                    />
                    <Form.Text className="text-danger">
                        {error?.message || <div className='mt-4'/>}
                    </Form.Text>
                </>
            )
            }/>
    );
};
export default CitiesSelect;