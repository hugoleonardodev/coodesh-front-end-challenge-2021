import styled, { css, keyframes } from 'styled-components'

const shimmer = keyframes`
    100% {
        transform: translateX(100%);
    }
`
const gradientBackGround = css`
    background-image: linear-gradient(to left, #dddbdd, #d2d2d2 50%, #dddbdd 75%, #dddbdd 75%);
`

export type TSigleLineSkeletonProperties = {
    isLarge?: boolean
}

export const SigleLineSkeleton = styled.span<TSigleLineSkeletonProperties>`
    display: inline-block;
    height: 2em;
    position: relative;
    overflow: hidden;
    background-color: #dddbdd;
    width: ${properties => (properties.isLarge ? '92px' : '60px')};

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        ${gradientBackGround}
        animation: ${shimmer} 1s infinite;
        content: '';
    }
`
