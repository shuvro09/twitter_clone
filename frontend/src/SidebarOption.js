import React from 'react'
import './SidebarOption.css'
function SidebarOption({active,text,Icon,hidden,onclick}) {
    return (
        <div className={`sidebarOption ${active && 'sidebarOption--active'} ${hidden && 'hidden'}`} 
            onClick={onclick}>
            <Icon />
            <h2>{text}</h2>
        </div>
    )
}

export default SidebarOption
