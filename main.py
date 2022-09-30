if __name__ == "__main__":
    import sys
    args = sys.argv[1:]
    if len(args) != 0:
        print("This script requires no command-line argument")
        exit(1)
    # import app and run here...
    # exit() # Can pass an exit code here
else:
    raise ImportError("Need to run this file directly, don't import")
