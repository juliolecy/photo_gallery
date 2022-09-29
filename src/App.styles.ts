import styled from 'styled-components'

export const Container = styled.div`
background-color: #141414;
min-height: 100vh;
color: #fff;
`

export const Area = styled.div`
margin: auto;
max-width: 980px;
padding: 30px 0;
`

export const Header = styled.h1`
margin:0;
padding:0;
font-weight: normal;
font-size: 4rem;
text-align: center;
margin-bottom: 30px;
`
export const ScreenWarning = styled.div`
text-align: center;
`

export const PhotoList = styled.div `
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 10px;
`

export const Upload = styled.form`
background-color: #3d3f43;
padding:15px;
border-radius: 15px;
margin-bottom: 30px;

input[type=submit]{
    background-color: #756df4;
    border:0;
    color: #fff;
    padding: 8px 16px;
    font-size: 15px;
    border-radius: 15px;
    margin: 0 20px;
    cursor: pointer;

    &:hover{
        opacity: .8;
    }
}
`