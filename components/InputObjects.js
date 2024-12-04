import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "@/app/store";

export default function InputObjects({form, setForm, name, attributes = []}) {
    const object = useMemo(() => {
        let result = {};

        attributes.map(attribute => {
            result[attribute.name] = ""
        });

        return result;
    }, [attributes]);

    const onChange = (event, index) => {
        form[name][index][event.target.name] = event.target.value;

        setForm({
            ...form,
        });
    }

    const add = () => {
        form[name].push(object);

        setForm({
            ...form,
        });
    }

    const remove = (index) => {
        form[name].splice(index, 1);

        setForm({
            ...form,
        });
    }

    useEffect(() => {

    }, []);

    return (
        <table className="m-input-objects type01">
            <colgroup>
                {attributes.map((attribute, index) => <col key={index}/>)}
                <col style={{width:'10%'}}/>
            </colgroup>
            <thead>
                <tr>
                    {attributes.map((attribute, index) => <th key={index}>{attribute.label}</th>)}
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {form[name].map((item, index) => (
                    <tr key={index}>
                        {
                            attributes.map((attribute, attributeIndex) =>
                                    <td key={attributeIndex}>
                                        <div className="m-input-text type01">
                                            <input type={attribute.type || 'text'} name={attribute.name} value={form[name][index][attribute.name]} placeholder={attribute.label} onChange={event => onChange(event, index)}/>
                                        </div>
                                    </td>
                            )
                        }
                        <td>
                            <button className="btn btn-remove" onClick={() => remove(index)}>삭제</button>
                        </td>
                    </tr>
            ))}
            <tr>
                <td colSpan={attributes.length + 1}>
                    <button className="btn-add" onClick={add}>추가</button>
                </td>
            </tr>
            </tbody>
        </table>
    );
}