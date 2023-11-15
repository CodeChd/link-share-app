interface ProfileFormProps {
  email: string;
  // eslint-disable-next-line no-unused-vars
  setEmail: (e: string) => void;
  firstName: string;
  // eslint-disable-next-line no-unused-vars
  setFirstName: (e: string) => void;
  lastName: string;
  // eslint-disable-next-line no-unused-vars
  setLastName: (e: string) => void;
  error: boolean;
}

const ProfileForm = ({
  email,
  setEmail,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  error,
}: ProfileFormProps) => {
  return (
    <form
      aria-label="user-input"
      className="gap-8 bg-lightGrey/20 p-4 rounded-lg w-full flex flex-col justify-between"
    >
      <div
        id="first-name"
        className="flex max-tablet:flex-col  justify-between"
      >
        {error && email.length <= 0 && (
          <span className="relative inline-block translate-y-[3.2rem] -translate-x-4">
            Can't be empty
          </span>
        )}
        <label
          htmlFor="firstname"
          className="whitespace-nowrap pr-4 text-b-m text-mediumGrey mb-1"
        >
          First name*
        </label>
        <input
          id="firstname"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="e.g.Cj"
          className="max-tablet:w-full w-[85%] p-3 h-12 bg-[left_0.4rem_bottom_0.8rem] outline-none bg-[length:15px] border-solid border-2  rounded-lg focus:border focus:border-solid  focus:border-royalBlue  focus:drop-shadow-input placeholder:text-mediumGrey/50"
        />
      </div>
      <div id="lastname" className="flex max-tablet:flex-col  justify-between ">
        <label
           htmlFor="lastnames"
          className="whitespace-nowrap pr-4 text-b-m text-mediumGrey mb-1"
        >
          Last name*
        </label>
        <input
          id="lastnames"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="e.g.Francisco"
          className="max-tablet:w-full w-[85%] p-3 h-12 bg-[left_0.4rem_bottom_0.8rem] outline-none bg-[length:15px] border-solid border-2  rounded-lg focus:border focus:border-solid  focus:border-royalBlue  focus:drop-shadow-input placeholder:text-mediumGrey/50"
        />
      </div>
      <div id="Email" className="flex max-tablet:flex-col  justify-between ">
        <label
          htmlFor="email"
          className="whitespace-nowrap pr-4 text-b-m text-mediumGrey mb-1"
        >
          Email
        </label>
        <input
          autoComplete="true"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g.email@example.com"
          className=" max-tablet:w-full  w-[85%]  bg-email bg-no-repeat h-12 p-2 ps-8 bg-[left_0.4rem_bottom_0.8rem] outline-none bg-[length:15px] border-solid border-2  rounded-lg focus:border focus:border-solid  focus:border-royalBlue  focus:drop-shadow-input placeholder:text-mediumGrey/90 "
        />
      </div>
    </form>
  );
};

export default ProfileForm;
