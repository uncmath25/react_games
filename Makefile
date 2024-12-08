.PHONY: clean dev build deploy

IMAGE_NAME="uncmath25/react-games"
PORT=3000
BUILD_FOLDER="build"
REMOTE_DIR_NAME="games"
REMOTE_SERVER_PROFILE="testinglab"
REMOTE_PARENT_WEBSITE_DIR="/home/player1/websites/react_games"

default: dev

clean:
	@echo "*** Cleaning repo of unnecessary artifacts... ***"
	rm -rf $(BUILD_FOLDER)

dev: clean
	@echo "*** Running Dockerized React development environment... ***"
	docker build -t $(IMAGE_NAME) .
	docker run --rm \
		-p $(PORT):$(PORT) \
		-v $$(pwd)/src:/usr/src/app/src \
		$(IMAGE_NAME)

build: clean
	@echo "*** Building production React deployment... ***"
	docker build -t $(IMAGE_NAME) .
	docker run --rm \
		-v $$(pwd)/$(BUILD_FOLDER):/usr/src/app/$(BUILD_FOLDER) \
		--entrypoint /bin/sh \
		$(IMAGE_NAME) -c "npm run build"

deploy: build
	@echo "*** Deploying React production app... ***"
	ssh $(REMOTE_SERVER_PROFILE) "rm -rf $(REMOTE_PARENT_WEBSITE_DIR)"
	scp -r $(BUILD_FOLDER) $(REMOTE_SERVER_PROFILE):$(REMOTE_PARENT_WEBSITE_DIR)
	@echo "*** Ensure that the nginx.conf is appended to the server's nginx.conf and restart the server's nginx ***"
