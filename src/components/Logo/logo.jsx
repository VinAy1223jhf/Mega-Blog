import React from 'react';

function Logo({ width = '100px' }) {
    return (
        <div>
            <img className='max-w-[4.5rem] h-auto border-none rounded-full' src="https://images.unsplash.com/photo-1496200186974-4293800e2c20?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
    );
}

export default Logo;
