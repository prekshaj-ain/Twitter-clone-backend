const Tweet = require("../../src/models/tweet");
const TweetRepository = require("../../src/repository/tweet-repository");

//mocking the tweet model
jest.mock("../../src/models/tweet");
describe("Create Tweet", () => {
  test("Should be able to create tweet and return it", async () => {
    const data = {
      content: "Testing Tweet",
    };

    const spy = jest.spyOn(Tweet, "create").mockImplementation(() => {
      return { ...data, createdAt: "2023-05-20", updatedAt: "2023-05-20" };
    });

    const tweetRepository = new TweetRepository();
    const tweet = await tweetRepository.create(data);

    expect(spy).toHaveBeenCalled();
    expect(tweet.content).toBe(data.content);
    expect(tweet.createdAt).toBeDefined();
  });

  test("should not create tweet and throw error", async () => {
    const data = {
      content: "Testing Tweet",
    };

    const spy = jest.spyOn(Tweet, "create").mockImplementation(() => {
      throw new Error("database error");
    });

    const tweetRepository = new TweetRepository();
    const tweet = await tweetRepository.create(data).catch((err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("database error");
    });
  });
});

describe("get Tweet by id", () => {
  test("should be able to get the tweet with id populated with likes", async () => {
    const id = 123;
    const data = {
      id: 123,
      content: "Testing tweet",
      likes: [
        {
          onModel: "Tweet",
          likeable: 123,
          user: 1,
        },
      ],
    };

    const populateMock = jest.fn().mockResolvedValueOnce(data);
    const spy = jest.spyOn(Tweet, "findById").mockReturnValueOnce({
      populate: populateMock,
    });

    const tweetRepository = new TweetRepository();
    const result = await tweetRepository.get(id);

    expect(result).toEqual(data);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(id);
    expect(populateMock).toHaveBeenCalledWith("likes");
  });

  test("should not be able to get with id and throw error", async () => {});
});

test("should be able to delete tweet and return true", async () => {
  const data = {
    id: 1,
    content: "Testing Tweet",
  };
  const spy = jest.spyOn(Tweet, "findByIdAndRemove").mockImplementation(() => {
    return { ...data, createdAt: "2023-05-20", updatedAt: "2023-05-20" };
  });

  const tweetRepository = new TweetRepository();
  const result = await tweetRepository.destroy(data.id);

  expect(spy).toHaveBeenCalled();
  expect(result).toBe(true);
});

test("should be able to getAll tweet and return them", async () => {
  const data = { content: "Testing Tweet" };
  const tweetsArray = [
    { ...data, createdAt: "2023-05-20", updatedAt: "2023-05-20" },
    { ...data, createdAt: "2023-05-20", updatedAt: "2023-05-20" },
    { ...data, createdAt: "2023-05-20", updatedAt: "2023-05-20" },
  ];
  const finalResponse = { tweetsArray };
  finalResponse.skip = jest.fn((offset) => finalResponse);
  finalResponse.limit = jest.fn((limit) =>
    finalResponse.tweetsArray.slice(0, limit)
  );
  const offset = 0;
  const limit = 2;
  const spy = jest.spyOn(Tweet, "find").mockImplementation(() => {
    return finalResponse;
  });

  const tweetRepository = new TweetRepository();
  const result = await tweetRepository.getAll(offset, limit);

  expect(spy).toHaveBeenCalled();
  expect(result).toHaveLength(limit);
  expect(spy().skip).toHaveBeenCalledWith(offset);
  expect(spy().skip().limit).toHaveBeenCalledWith(limit);
});
