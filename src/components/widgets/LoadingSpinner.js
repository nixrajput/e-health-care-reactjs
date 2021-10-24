import Loader from "react-loader-spinner";

function LoadingSpinner({ elevated = true }) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--whiteColor)",
            borderRadius: "50%",
            padding: 10,
            boxShadow: elevated ? "var(--boxShadowMin)" : null
        }}>
            <Loader type="TailSpin"
                color="var(--activeColor)"
                height={32}
                width={32}
            />
        </div>
    )
}

export default LoadingSpinner;