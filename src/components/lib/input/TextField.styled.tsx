import styled, { css } from "styled-components";
// import { ReactComponent as Arrow } from '../../../svg/arrow.svg';

// export const Icon = styled(Arrow)<{ open?: boolean }>`
//   position: absolute;
//   right: 10px;
//   top: 50%;
//   margin-top: -12px;
//   transition: 200ms ease-in-out;
//   transform: ${props => (props.open ? 'rotate(90deg)' : 'rotate(0deg)')};
// `;

export const Container = styled.div`
    margin: 0 auto 20px;
    width: 90%;
    // @media (max-width: 992px) {
    //     box-sizing: border-box;
    //     background: #f2f2f2;
    //     // border: 1px solid rgba(255, 255, 255, 0.5);
    //     -webkit-filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    //     filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    //     border-radius: 5px;
    //     // padding: 20px;
    //     span {
    //         display: none;
    //     }
    // }
`;

export const Input = styled.input<{ error?: boolean }>`
    width: 100%;
    // height: 56px;
    padding: 15px;
    font-size: 16px;
    background: #e5e5e5;
    &:focus,
    &:active {
        outline: 0;
    }
    &:active,
    &:focus {
        border-color: ${(props) => (props.error ? "#f8f7f7" : "blueviolet")};
    }

    &:focus,
    &:valid {
        ~ span {
            &::before {
                color: ${(props) => (props.error ? "#f44336" : " rgba(38, 50, 56, 0.4)")};
                transform: translateY(-26px);
                background-color: #e5e5e5;
                padding: 2px 4px;
            }
        }
    }
    // @media (max-width: 992px) {
    //     background: #f2f2f2;
    //     border: 1px solid #f2f2f2;
    //     padding: 20px;
    //     height: 63px;
    // }
`;

export const Label = styled.label<{ error?: boolean }>`
    position: relative;
    width: 100%;
    box-sizing: border-box;
    > span {
        &::after,
        &::before {
            position: absolute;
            transition: 200ms ease-in-out;
        }
        &::before {
            content: attr(data-label);
            left: 16px;
            top: 0;
            bottom: 0;
            margin: auto;
            pointer-events: none;
            height: 18px;
            font-size: 14px;
            line-height: 21px;
            color: ${(props) => (props.error ? "#f44336" : "rgba(38, 50, 56, 0.4)")};
            line-height: 1;
        }
    }

    input {
        border: 1px solid ${(props) => (props.error ? "#f44336" : "rgba(0, 0, 0, 0.2)")};
        border-radius: 4px;
        span {
            &::before {
                color: ${(props) => (props.error ? "#f44336" : " rgba(38, 50, 56, 0.4)")};
            }
        }
        &:focus {
            ~ span {
                &::before {
                    font-size: 12px;
                    color: ${(props) => (props.error ? "#f44336" : "blueviolet")};
                }
            }
        }
    }
`;

export const ErrorText = styled.div<{ error?: boolean }>`
    margin: 0;
    font-size: 12px;
    margin-top: 3px;
    text-align: left;
    color: ${(props) => (props.error ? "#f44336" : "#263238")};
    margin-left: 14px;
    margin-right: 14px;
`;
