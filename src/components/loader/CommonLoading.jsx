import {Spin} from "antd";

export const CommonLoading = () => <div style={{
    height: '70vh', // Full viewport height
    display: 'flex', // Enables Flexbox
    justifyContent: 'center', // Centers horizontally
    alignItems: 'center' // Centers vertically
}}>
    <Spin size="large" />
</div>