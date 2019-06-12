#!/bin/bash
package="package.json"
if [ -f $package ]; then
  echo "exist $package"
else
  cd ../../
  if [ -f $package ]; then
    echo "exist $package"
  else
    echo "No Sunch File : $package"
    exit
  fi
fi

dependencies=(
  debug
  koa
  koa-body
  koa-convert
  koa-json
  koa-logger
  koa-onerror
  koa-router
  koa-session
  koa-static
  koa-views
  mysql2
  sequelize
)
devDependencies=(
  @types/debug
  @types/koa
  @types/koa-router
  @types/koa-session
  colors
  gulp
  gulp-rename
  gulp-typescript
  typescript
)
installDependencies() {
  echo "installing ${dependencies[*]}"
  yarn add ${dependencies[*]}
}
#installDependencies
#
installDevDependencies() {
  echo "installing ${devDependencies[*]}"
  yarn add ${devDependencies[*]} --dev
}
installDevDependencies

#for (( i = 0; i < ${#devDependencies[@]}; i++ )); do
#  dependenciesList="${devDependencies} ${devDependencies[i]}"
#done
#echo "$dependenciesList"
