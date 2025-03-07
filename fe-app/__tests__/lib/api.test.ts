import MockAdapter from "axios-mock-adapter";
import {
  api,
  getMortgageProducts,
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
} from "@/lib/api";
import { Product, Application, CreateApplication, Applicant } from "@/types";

const mock = new MockAdapter(api);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const mockedApplication: Application = {
  id: "123",
  token: "",
  type: "NEW",
  applicants: [],
  createdAt: "",
};
const mockedApplicant: Applicant = {
  phone: "1234567890",
  email: "john@doe.com",
  firstName: "John",
  lastName: "Doe",
};
const mockedProdcut: Product = {
  id: 1,
  name: "Mocked Product",
  family: "VALUE_FLEX",
  type: "FIXED",
  term: "1_YEAR",
  insurable: false,
  insurance: "INSURED",
  prepaymentOption: "STANDARD",
  restrictionsOption: "NO_RESTRICTIONS",
  restrictions: "",
  fixedPenaltySpread: "",
  helocOption: "HELOC_WITH",
  helocDelta: 0,
  lenderName: "",
  lenderType: "",
  rateHold: "30_DAYS",
  rate: 0,
  ratePrimeVariance: 0,
  bestRate: 0,
  created: "",
  updated: ""
};
describe("API Functions", () => {
  afterEach(() => {
    mock.reset();
  });

  test("getMortgageProducts - fetches mortgage products", async () => {
    const mockProducts: Product[] = [mockedProdcut];
    mock.onGet(`${API_BASE_URL}/products`).reply(200, mockProducts);

    const products = await getMortgageProducts();
    expect(products).toEqual(mockProducts);
  });

  test("createApplication - creates an application", async () => {
    const mockApplication: Application = {
      ...mockedApplication,
      productId: 1,
      createdAt: new Date().toISOString(),
    };
    const applicationData: CreateApplication = { productId: 1 };

    mock.onPost(`${API_BASE_URL}/applications`).reply(201, mockApplication);

    const response = await createApplication(applicationData);
    expect(response).toEqual(mockApplication);
  });

  test("getApplications - fetches all applications", async () => {
    const mockApplications: Application[] = [mockedApplication];
    mock.onGet(`${API_BASE_URL}/applications`).reply(200, mockApplications);

    const applications = await getApplications();
    expect(applications).toEqual(mockApplications);
  });

  test("getApplication - fetches a specific application by ID", async () => {
    const mockApplication: Application = {
      ...mockedApplication,
      createdAt: new Date().toISOString(),
    };
    mock.onGet(`${API_BASE_URL}/applications/1`).reply(200, mockApplication);

    const application = await getApplication("1");
    expect(application).toEqual(mockApplication);
  });

  test("updateApplication - updates an application", async () => {
    const updatedApplication: Application = {
      ...mockedApplication,
      applicants: [mockedApplicant],
      createdAt: new Date().toISOString(),
    };
    const updatePayload = { applicants: [mockedApplicant] };

    mock.onPut(`${API_BASE_URL}/applications/123`).reply(200, updatedApplication);

    const response = await updateApplication("123", updatePayload);
    expect(response).toEqual(updatedApplication);
  });

  test("handles API errors gracefully", async () => {
    mock.onGet(`${API_BASE_URL}/applications`).reply(500);

    await expect(getApplications()).rejects.toThrow();
  });
});
