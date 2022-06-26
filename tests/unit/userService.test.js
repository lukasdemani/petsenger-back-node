import { faker } from "@faker-js/faker";
import { jest } from "@jest/globals";
import bcrypt from "bcrypt";
import cardRepository, {
  CardInsertData,
  TransactionTypes,
} from "../../src/repositories/cardRepository.js";
import companyRepository from "../../src/repositories/companyRepository.js";
import employeeRepository, {
  Employee,
} from "../../src/repositories/employeeRepository.js";
import cardService from "../../src/services/cardService.js";

describe("Card service unit tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should create a card", async () => {
    const apiKey = "12345";
    const employeeId = 1;
    const cardType: TransactionTypes = "groceries";
    const cardCVC = "123";
    const cardNumber = "6771-8904-7736-0214";
    const employee: Employee = {
      id: employeeId,
      fullName: "mateus moura",
      email: "dina@email.com",
      cpf: "47100946832",
      companyId: 1,
    };

    jest.spyOn(faker.finance, "creditCardNumber").mockReturnValue(cardNumber);
    jest.spyOn(faker.finance, "creditCardCVV").mockReturnValue(cardCVC);
    jest.spyOn(bcrypt, "hashSync").mockReturnValue(cardCVC);

    const cardData = cardService.generateCardData(employee.fullName);
    const expectedCard: CardInsertData = {
      ...cardData,
      isBlocked: false,
      isVirtual: false,
      employeeId,
      type: cardType,
    };

    jest
      .spyOn(companyRepository, "findByApiKey")
      .mockResolvedValue(companyFactory(apiKey));
    jest.spyOn(employeeRepository, "findById").mockResolvedValue(employee);
    jest
      .spyOn(cardRepository, "findByTypeAndEmployeeId")
      .mockResolvedValue(null);
    const cardRepositoryInsert = jest
      .spyOn(cardRepository, "insert")
      .mockResolvedValue(null);

    await cardService.create(apiKey, employeeId, cardType);

    expect(cardRepositoryInsert).toBeCalledTimes(1);
    expect(cardRepositoryInsert).toBeCalledWith(expectedCard);
  });

  it("should create a card with the correct abbreviated name", async () => {
    const apiKey = "12345";
    const employeeId = 1;
    const cardType: TransactionTypes = "groceries";
    const cardCVC = "123";
    const cardNumber = "6771-8904-7736-0214";
    const employee: Employee = {
      id: employeeId,
      fullName: "mateus de nardo moura",
      email: "dina@email.com",
      cpf: "47100946832",
      companyId: 1,
    };

    jest.spyOn(faker.finance, "creditCardNumber").mockReturnValue(cardNumber);
    jest.spyOn(faker.finance, "creditCardCVV").mockReturnValue(cardCVC);
    jest.spyOn(bcrypt, "hashSync").mockReturnValue(cardCVC);

    const cardData = cardService.generateCardData(employee.fullName);
    const expectedCard: CardInsertData = {
      ...cardData,
      isBlocked: false,
      isVirtual: false,
      employeeId,
      type: cardType,
    };

    jest
      .spyOn(companyRepository, "findByApiKey")
      .mockResolvedValue(companyFactory(apiKey));
    jest.spyOn(employeeRepository, "findById").mockResolvedValue(employee);
    jest
      .spyOn(cardRepository, "findByTypeAndEmployeeId")
      .mockResolvedValue(null);
    const cardRepositoryInsert = jest
      .spyOn(cardRepository, "insert")
      .mockResolvedValue(null);

    await cardService.create(apiKey, employeeId, cardType);

    expect(cardRepositoryInsert).toBeCalledTimes(1);
    expect(cardRepositoryInsert).toBeCalledWith(expectedCard);
  });

  it.todo("should not create a card given invalid api key");

  it.todo("should activate a card");
  it.todo("should return a card");
});

function companyFactory(apiKey: string) {
  return {
    id: 1,
    name: "driven",
    apiKey,
  };
}
