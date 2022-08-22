import { usePromiseTracker } from 'react-promise-tracker';

function LoadSpinner() {
    const { promiseInProgress } = usePromiseTracker({ delay: 200 });

    return (
        <>
            {promiseInProgress && (
                <div className="d-flex justify-content-center m-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            <div />
        </>
    );
}

export default LoadSpinner;
