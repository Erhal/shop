import AsyncSelect from "react-select/async";
import {Controller} from "react-hook-form";
import {useState} from "react";
import Form from "react-bootstrap/Form";

const CitiesSelect = ({control, name}) => {

    const [citiesArr, setCitiesArr] = useState([]);

    const loadOptions = async (inputValue, callback) => {
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
            const data = await response.json();
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
            name={name}
            rules={{
                required: "City is required",
                validate: (value) => {
                    return citiesArr.some(el => el.value === value)
                }
            }}
            render={({field: {value, onChange}, fieldState: {error}}) => (
                <>
                    <AsyncSelect
                        cacheOptions
                        placeholder={'Select city'}
                        loadOptions={loadOptions}
                        noOptionsMessage={() => 'Start typing...'}
                        value={citiesArr.find(el => el.value === value)}
                        onChange={newValue => onChange(newValue.value)}
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