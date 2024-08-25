import React from "react";

export default function Button({onclick,children}: {onclick : ()=> {},children : React.ReactNode}){
    return <button className="mb-5 bg-white px-4 py-2 rounded-lg text-sm" onClick={onclick}>
        {children}
    </button>
}