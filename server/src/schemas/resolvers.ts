import { User } from "../models/index.js";


interface UserArgs {
  _id: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },

    me: async (_parent: unknown, { _id }: UserArgs) => {
      return await User.findOne({ _id: _id }).populate('clients');
    },
  },

  // Mutation: {
  //   addProfile: async (_parent: unknown, { name }: AddProfileArgs) => {
  //     return await Profile.create({ name });
  //   },
  //   addSkill: async (_parent: unknown, { profileId, skill }: SkillArgs) => {
  //     return await Profile.findOneAndUpdate(
  //       { _id: profileId },
  //       {
  //         $addToSet: { skills: skill },
  //       },
  //       {
  //         new: true,
  //         runValidators: true,
  //       }
  //     );
  //   },
  //   removeProfile: async (_parent: unknown, { profileId }: ProfileArgs) => {
  //     return await Profile.findOneAndDelete({ _id: profileId });
  //   },
  //   removeSkill: async (_parent: unknown, { profileId, skill }: SkillArgs) => {
  //     return await Profile.findOneAndUpdate(
  //       { _id: profileId },
  //       { $pull: { skills: skill } },
  //       { new: true }
  //     );
  //   },
  // },
};

export default resolvers;
