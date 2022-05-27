import { useState } from 'react';

const Copyright: React.FC = () => {
    const [showing, setShowing] = useState<boolean>(false);
    return (
        <div className='fixed bottom-0 p-3 text-center mx-auto w-full bg-slate-200'>
            {showing && (<p className="mx-10">Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), copyright © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved. You may not copy or download more than 500 consecutive verses of the ESV Bible or more than one half of any book of the ESV Bible.</p>)}
            <button className='text-slate-800 hover:text-slate-300 border-slate-800 border-2 rounded-md px-2' onClick={() => setShowing(!showing)}>{showing ? "Hide Copyright Info" : "Show Copyright Info"}</button>
        </div>
    );

}
export default Copyright;