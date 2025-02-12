export const Footer = () => {
  return (
    <footer className="py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
      Built by{" "}
      <a
        href="https://berkekaradayi.com"
        className="text-blue-500 hover:underline"
      >
        Mehmet Berke Karadayi
      </a>{" "}
      using
      <a
        href="https://onchainkit.xyz"
        target="_blank"
        className="text-blue-500 hover:underline"
      >
        {" "}
        OnchainKit
      </a>{" "}
      &{" "}
      <a
        href="https://base.org"
        target="_blank"
        className="text-blue-500 hover:underline"
      >
        {" "}
        Base Network
      </a>
      .
    </footer>
  );
};
