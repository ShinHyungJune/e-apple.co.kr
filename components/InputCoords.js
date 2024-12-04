import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "@/app/store";

export default function InputCoords({form, setForm, name}) {
    const coord = {
        lat: "",
        lon: "",
    }
    const onChange = (event, index) => {
        form[name][index][event.target.name] = event.target.value;

        setForm({
            ...form,
        });
    }

    const add = () => {
        form[name].push(coord);

        setForm({
            ...form,
        });
    }

    useEffect(() => {

    });

    return (
        <div className="m-input-coords type01">
            {form[name].map((item, index) => (
                <div className={"m-input-coord-wrap"} key={index}>
                    <div className="m-input-text type01">
                        <input type="text" name={"lat"} value={form[name][index].lat} onChange={event => onChange(event, index)}/>
                    </div>
                    <div className="m-input-text type01">
                        <input type="text" name={"lon"} value={form[name][index].lon} onChange={event => onChange(event, index)}/>
                    </div>

                    {
                        (index + 1) === form[name].length
                            ? <button className="btn-add" onClick={add}>추가</button>
                            : null
                    }

                </div>
            ))}

        </div>
    );
}