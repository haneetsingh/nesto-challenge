import '@testing-library/jest-dom';
import nextRouterMock from "next-router-mock";

jest.mock("next/router", () => nextRouterMock);