if __name__ == "__main__":
    import sys
    args = sys.argv[1:]
    if len(args) != 0:
        print("This script requires no command-line argument")
        exit(1)
    import ml_test_api 
    ml_test_api.app.run(host="127.0.0.1", port=5000, debug=True)
else:
    raise ImportError("Need to run this file directly, don't import")